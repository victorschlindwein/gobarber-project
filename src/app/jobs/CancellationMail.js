import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancallationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    console.log('A fila andou parsero');

    await Mail.sendMail({
      to: `${appointment.provider.nome} <${appointment.provider.email}`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.nome,
        user: appointment.user.nome,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às ' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
