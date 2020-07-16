# Recuperação de Senha

**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário poder resetar sua senha;

**Requisitos Não Funcionais**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon Simple Email Services para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**Regras de Negócio**

- O link enviado por e-mail para resetar senha, deve expirar em 2 horas;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do Perfil

**Requisitos Funcionais**

- O usuário deve poder atualizar o seu perfil;

**Requisitos Não Funcionais**

**Regras de Negócio**

- O usuario não pode alterar seu e-mail para um e-mail já utilizado por outro usuário;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do Prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve ppoder visualizar as notificações não lidas;

**RFN**

- Os agendamentos do prestador no dia devem ser armazenados no cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notiticações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RFN**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1 hora exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (primeiro 8h, último às 17h);
- O usuario não pode agendar um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
