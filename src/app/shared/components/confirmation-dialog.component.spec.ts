import { render, fireEvent } from '@testing-library/angular';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  it('should create', async () => {
    const component = await render(ConfirmationDialogComponent);
    expect(component.fixture.componentInstance).toBeTruthy();
  });

  it('should set isConfirmationOpen to true by default', async () => {
    const component = await render(ConfirmationDialogComponent);
    expect(component.fixture.componentInstance.isConfirmationOpen).toBe(true);
  });

  it('should close confirmation dialog on Cancel button click', async () => {
    const component = await render(ConfirmationDialogComponent);
    const cancelButton = component.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(component.fixture.componentInstance.isConfirmationOpen).toBe(false);
  });

  it('should close confirmation dialog on Confirm button click', async () => {
    const component = await render(ConfirmationDialogComponent);
    const confirmButton = component.getByText('Confirm');
    fireEvent.click(confirmButton);
    expect(component.fixture.componentInstance.isConfirmationOpen).toBe(false);
  });

  it('should have a dialog element with open attribute set to true', async () => {
    const component = await render(ConfirmationDialogComponent);
    const dialogElement = component.getByRole('dialog');
    expect(dialogElement).toBeTruthy();
    expect(dialogElement.hasAttribute('open')).toBe(true);
  });
});
