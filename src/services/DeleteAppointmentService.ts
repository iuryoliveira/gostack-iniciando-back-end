import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  id: string;
}

class DeleteAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ id }: Request): void {
    const deleted = this.appointmentsRepository.delete(id);

    if (!deleted) {
      throw Error('Appointment not found.');
    }
  }
}

export default DeleteAppointmentService;
