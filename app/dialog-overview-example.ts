import { Component, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatButton,
} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
  top: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.html',
  styleUrls: ['dialog-overview-example.css'],
})
export class DialogOverviewExample {
  @ViewChild(MatButton) button: MatButton;

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect =
      this.button._elementRef.nativeElement.getBoundingClientRect();
    const right = bodyRect.right - elemRect.right;
    const top = elemRect.top - bodyRect.top;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      maxWidth: '100vw',
      data: { name: this.name, animal: this.animal, top: 10, bottom: 200 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SecondDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect =
      this.dialogRef._containerInstance[
        '_elementRef'
      ].nativeElement.getBoundingClientRect();
    const right = bodyRect.right - elemRect.right;
    const top = elemRect.top - bodyRect.top;
    const dialogRef = this.dialog.open(SecondDialog, {
      width: '150px',
      position: { right: right + 'px', top: top + 'px' },
      hasBackdrop: false,
    });
  }
  update() {
    let diP = { top: 0 + 'px', left: 0 + 'px' };

    this.dialogRef.updatePosition(diP);
    let h = window.innerHeight - 0;
    let w = window.innerWidth - 0;
    this.dialogRef.updateSize(w + 'px', h + 'px');
    // console.log(this.dialogRef._getPositionStrategy());
  }
}

@Component({
  selector: 'second-dialgog-',
  templateUrl: 'second.dialog.html',
})
export class SecondDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    alert('s');
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
