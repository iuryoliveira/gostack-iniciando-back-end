import Appointment from '../models/Appointment';
import AppointmentsRepositoy from '../repositories/AppointmentsRepository';

interface Request {
  id: string;
  provider: string;
  date: Date;
}

class UpdateAppointmentService {
  private appointmentsRepository: AppointmentsRepositoy;

  constructor(appointmentsRepository: AppointmentsRepositoy) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ id, provider, date }: Request): Appointment {
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      date,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked.');
    }

    const updatedAppointment = this.appointmentsRepository.update(
      id,
      provider,
      date,
    );

    if (!updatedAppointment) {
      throw Error('Appointment not found.');
    }

    return updatedAppointment;
  }
}

export default UpdateAppointmentService;
