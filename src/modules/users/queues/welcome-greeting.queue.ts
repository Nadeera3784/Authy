import { MailerService } from '@nestjs-modules/mailer';
import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';

@Processor('welcome-greeting')
export class WelcomeGreetingQueue {
  constructor(private readonly mailService: MailerService) {}

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name}: ${job.data.id}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Job ${job.id} of type ${job.name} completed`);
  }

  @Process('send-welcome-greeting')
  async send(job: Job<any>) {
    try {
      console.log('send mail trigered', job);
      await this.mailService.sendMail(job.data);
    } catch (error) {
      console.log(`Failed to send email | error: ${error.message}`);
    }
  }
}
