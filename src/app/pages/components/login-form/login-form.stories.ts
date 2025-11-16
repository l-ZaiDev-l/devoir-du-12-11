import type { Meta, StoryObj } from '@storybook/angular';
import { LoginFormComponent } from './login-form';
import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<LoginFormComponent> = {
  title: 'Auth/Login Form',
  component: LoginFormComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  argTypes: {
    loginSubmit: { action: 'submit' },
  },
};

export default meta;

export const Default: StoryObj<LoginFormComponent> = {
  args: {
  },
};
