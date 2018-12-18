import { BaseComponent } from './base.component';

export class DatepickerPo extends BaseComponent {
  pageUrl = '/datepicker';
  pageTitle = 'Datepicker';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/datepicker';

  datepickerInput = 'input[bsdatepicker]';
  daterangepickerInput = 'input[bsdaterangepicker]';
  datepickerLastOpened = 'bs-datepicker-container:last';
  daterangepickerLastOpened = 'bs-daterangepicker-container:last';
  datepickerNavView = 'bs-datepicker-navigation-view';
  datepickerContainer = 'bs-datepicker-container';
  daterangepickerContainer = 'bs-daterangepicker-container';
  datepickerDays = '[bsdatepickerdaydecorator]';
  datepickerBodyDaysView = 'bs-days-calendar-view';
  datepickerBodyMonthView = 'bs-month-calendar-view';
  datepickerBodyYearsView = 'bs-years-calendar-view';
  formOutput = '.code-preview';
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December', 'January'];


  exampleDemosArr = {
    basic: 'demo-datepicker-basic',
    initialState: 'demo-datepicker-date-initial-state',
    customFormat: 'demo-date-picker-custom-format',
    hideOnScroll: 'demo-date-picker-hide-on-scroll',
    themes: 'demo-datepicker-color-theming',
    locales: 'demo-datepicker-change-locale',
    minMax: 'demo-datepicker-min-max',
    daysDisabled: 'demo-datepicker-daysdisabled',
    minMode: 'demo-datepicker-min-mode',
    disabled: 'demo-datepicker-disabled',
    forms: 'demo-datepicker-forms',
    reactiveForms: 'demo-datepicker-reactive-forms',
    manualTrigger: 'demo-datepicker-triggers-manual',
    placemeent: 'demo-datepicker-placement',
    configMethod: 'demo-datepicker-config-method',
    visibilityEvents: 'demo-datepicker-visibility-events',
    valueChangeEvent: 'demo-datepicker-value-change-event',
    configProperties: 'demo-datepicker-config-object',
    selectFromOtherMonth: 'demo-datepicker-select-dates-from-other-months',
    outsideClick: 'demo-datepicker-outside-click',
    triggerByIsOpen: 'demo-datepicker-trigger-by-isopen',
    customTriggers: 'demo-datepicker-triggers-custom'
  };

  clickOnDayInCurrMonth(baseSelector: string, day: string) {
    cy.get(`${baseSelector} ${this.datepickerDays}`)
      .not('.is-other-month')
      .contains(day).click();
  }

  clickOnDatepickerInput(baseSelector: string) {
    cy.get(`${baseSelector} ${this.datepickerInput}`).click();
  }

  clickOnDaterangepickerInput(baseSelector: string) {
    cy.get(`${baseSelector} ${this.daterangepickerInput}`).click();
  }

  isSelectedDateExist(picker = 'datepicker' || 'daterangepicker', exist: boolean, expectedDay?: string) {
    if (!exist) {
      cy.get(`${picker === 'datepicker' ? this.datepickerContainer : this.daterangepickerContainer} .selected`)
        .should('not.exist');
    } else {
      cy.get(`${picker === 'datepicker' ? this.datepickerContainer : this.daterangepickerContainer} .selected`)
        .should('be.visible')
        .and('to.have.text', expectedDay);
    }
  }

  isVisibleMonthOrYearEqual(expectedMonth: string) {
    cy.get(`${this.datepickerNavView} button`).eq(1)
      .should('be.visible')
      .and('to.have.text', expectedMonth);
  }

  isNavigationFullyActiveAndCorrect(picker = 'datepicker', mode = 'date', expectedMonth?: string, expectedYear?: string) {
    if (picker === 'datepicker') {
      cy.get(`${this.datepickerContainer} ${this.datepickerNavView} button`).as('DatepickerNavBarArray');
      cy.get('@DatepickerNavBarArray')
        .should('to.have.length', mode === 'date' ? 4 : 3);
      cy.get('@DatepickerNavBarArray').get('.previous')
        .should('be.visible')
        .and('to.have.text', '‹');
      if (mode === 'date') {
        cy.get('@DatepickerNavBarArray').eq(1)
          .should('be.visible')
          .and('to.have.text', expectedMonth ? expectedMonth : this.monthNames[new Date().getMonth()]);
        cy.get('@DatepickerNavBarArray').eq(2)
          .should('be.visible')
          .and('to.have.text', expectedYear ? expectedYear : new Date().getFullYear().toString());
      } else if (mode === 'month') {
        cy.get('@DatepickerNavBarArray').eq(1)
          .should('be.visible')
          .and('to.have.text', expectedYear ? expectedYear : new Date().getFullYear().toString());
      } else {
        cy.get('@DatepickerNavBarArray').eq(1)
          .should('be.visible')
          .and('to.have.text', `${new Date().getFullYear() - 7} - ${new Date().getFullYear() + 8}`);
      }
      cy.get('@DatepickerNavBarArray').get('.next')
        .should('be.visible')
        .and('to.have.text', '›');

    } else {
      // cy.get(`${this.daterangepickerContainer} ${this.datepickerNavView}`).as('DaterangepickerNavBar'); //TODO
    }
  }

  isDatePickerBodyExistAndCorrect(mode: string) {
    const bodyView = this.getBodyParams(mode).bodyView;
    const expectedLength = this.getBodyParams(mode).expectedLength;

    cy.get(`${this.datepickerContainer} ${bodyView} td`)
      .should('to.have.length', expectedLength);
  }

  isDatePickerTriggerCorrect(mode: string) {
    const bodyView = this.getBodyParams(mode).bodyView;

    cy.get(`${this.datepickerContainer} ${bodyView} td`)
      .each(date => {
        cy.wrap(date).trigger('mouseenter').should('to.have.class', 'is-highlighted');
      });
  }

  isInputValueEqual(baseSelector: string, expectedTxt: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).should('to.have.value', expectedTxt);
  }

  getBodyParams(mode: string) {
    let bodyView: string;
    let expectedLength: number;
    switch (mode) {
      case 'date':
        bodyView = this.datepickerBodyDaysView;
        expectedLength = 48;
        break;
      case 'month':
        bodyView = this.datepickerBodyMonthView;
        expectedLength = 12;
        break;
      // cy.get(`${this.datepickerContainer} ${this.datepickerBodyMonthView} td`).should('to.have.length', 12);
      case 'year':
        bodyView = this.datepickerBodyYearsView;
        expectedLength = 16;
        break;
      // cy.get(`${this.datepickerContainer} ${this.datepickerBodyYearsView} td`).should('to.have.length', 16);
      default:
        throw new Error('Unknown view mode');
    }

    return { bodyView, expectedLength };
  }

  clickOnNavigation(navigationItem: string) {
    switch (navigationItem) {
      case '<' :
        cy.get(`${this.datepickerNavView} .previous`).click();
        break;

      case '>' :
        cy.get(`${this.datepickerNavView} .next`).click();
        break;

      case 'month' :
        cy.get(`${this.datepickerNavView} button`).eq(1).click();
        break;

      case 'year' :
        cy.get(`${this.datepickerNavView} button`).eq(2).click();
        break;

      default:
        throw new Error('Unknown navigation item');
    }
  }

  clickOnDatepickerTableItem(picker: string, mode: string, itemIndex?: number, itemText?: string) {
    const bodyView = this.getBodyParams(mode).bodyView;
    if (picker === 'datepicker' && itemText === undefined) {
      cy.get(`${this.datepickerContainer} ${bodyView} td`).eq(itemIndex).click();
    } else if (picker === 'datepicker' && itemText !== undefined) {
      cy.get(`${this.datepickerContainer} ${bodyView} td`).contains(itemText).click();
    } else if (picker === 'daterangepicker') {
      // TODO
    }
  }
}
