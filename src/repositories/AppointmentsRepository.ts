import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepositoy {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public findById(id: string): Appointment | null {
    const findAppointment = this.appointments.find(
      appointment => appointment.id === id,
    );

    return findAppointment || null;
  }

  public findByIndex(id: string): number {
    return this.appointments.findIndex(appointment => appointment.id === id);
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);
    return appointment;
  }

  public update(id: string, provider: string, date: Date): Appointment | null {
    const appointmentIndex = this.findByIndex(id);

    if (appointmentIndex < 0) {
      return null;
    }

    const updatedAppointment: Appointment = {
      id,
      provider,
      date,
    };

    this.appointments[appointmentIndex] = updatedAppointment;

    return updatedAppointment;
  }

  public delete(id: string): boolean {
    const appointmentIndex = this.findByIndex(id);

    if (appointmentIndex < 0) {
      return false;
    }

    this.appointments.splice(appointmentIndex, 1);

    return true;
  }
}

export default AppointmentsRepositoy;
