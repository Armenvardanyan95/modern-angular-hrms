import { FormControl } from '@angular/forms';

export type EmployeeForm = {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  position: FormControl<string>;
  level: FormControl<string>;
};
