import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import FindAppointmentService from '../services/FindAppointmentService';
import UpdateAppointmentService from '../services/UpdateAppointmentService';
import DeleteAppointmentService from '../services/DeleteAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentsRouter.get('/:id', (request, response) => {
  try {
    const { id } = request.params;

    const findAppointmentService = new FindAppointmentService(
      appointmentsRepository,
    );

    const appointment = findAppointmentService.execute({ id });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentsRouter.put('/:id', (request, response) => {
  const { provider, date } = request.body;
  const { id } = request.params;

  try {
    const parsedDate = startOfHour(parseISO(date));

    const updateAppointment = new UpdateAppointmentService(
      appointmentsRepository,
    );

    const updatedAppointment = updateAppointment.execute({
      id,
      provider,
      date: parsedDate,
    });

    return response.json(updatedAppointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentsRouter.delete('/:id', (request, response) => {
  try {
    const { id } = request.params;

    const deleteAppointment = new DeleteAppointmentService(
      appointmentsRepository,
    );

    deleteAppointment.execute({ id });
    return response.send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
