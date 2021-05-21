import {NgModule} from '@angular/core';

import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CalendarModule} from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule}  from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
//import { AutoCompleteModule } from 'primeng/autocomplete';
//import { ChartModule } from 'primeng/chart';

@NgModule({
  exports: [
    AccordionModule,
    AvatarGroupModule,
    AvatarModule,
    BlockUIModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    ContextMenuModule ,
    CodeHighlighterModule,
    DialogModule ,
    DropdownModule,
    FileUploadModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    MenubarModule,
    PanelModule,
    PasswordModule,
    RadioButtonModule,
    SliderModule,
    SplitButtonModule,
    TabViewModule,
    TooltipModule,

    BadgeModule,
    ChipsModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    MessageModule,
    SelectButtonModule,
    TooltipModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    TableModule,
    ToastModule,
    InputSwitchModule,
    InputMaskModule,
    FieldsetModule
  ]
})

export class PrimeNGModule {}