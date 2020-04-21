import Appointment from '../models/Appointment';
import AppointmentsRepositoy from '../repositories/AppointmentsRepository';

interface Request {
  id: string;
}

class FindAppointmentService {
  private appointmentsRepository: AppointmentsRepositoy;

  constructor(appointmentsRepository: AppointmentsRepositoy) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ id }: Request): Appointment {
    const appointment = this.appointmentsRepository.findById(id);

    if (!appointment) {
      throw Error('Appointment not found.');
    }

    return appointment;
  }
}

export default FindAppointmentService;
