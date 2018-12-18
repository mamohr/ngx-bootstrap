import { DatepickerPo } from '../support/datepicker.po';

describe('Datepicker demo page test suite', () => {
  const datepicker = new DatepickerPo();

  beforeEach(() => datepicker.navigateTo());

  describe('Basic', () => {
    const basic = datepicker.exampleDemosArr.basic;

    beforeEach(() => datepicker.scrollToMenu('Basic'));

    it('example contains 2 inputs: Datepicker and Daterangepicker with appropriate placeholders', () => {
      datepicker.isInputHaveAttrs(basic, [
        { attr: 'placeholder', value: 'Datepicker' },
        { attr: 'type', value: 'text' }], 0);

      datepicker.isInputHaveAttrs(basic, [
        { attr: 'placeholder', value: 'Daterangepicker' },
        { attr: 'type', value: 'text' }], 1);
    });

    it('when user clicks on "Datepicker" input, container with 2 arrows: "‹", "›" opened, no one date selected', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.isSelectedDateExist('datepicker', false);
      datepicker.isNavigationFullyActiveAndCorrect('datepicker', 'date');
    });

    it('when user clicks on "‹" - previous month shown, when user clicks on "›" - next month shown', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('<');
      datepicker.isSelectedDateExist('datepicker', false);
      datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[new Date().getMonth() - 1]);
      datepicker.clickOnNavigation('>');
      datepicker.isSelectedDateExist('datepicker', false);
      datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[new Date().getMonth()]);
      datepicker.clickOnNavigation('>');
      datepicker.isSelectedDateExist('datepicker', false);
      datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[new Date().getMonth() + 1]);
    });

    it('when user clicks on month, then full table with 12 months shown with year in head block', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('month');
      datepicker.isNavigationFullyActiveAndCorrect('datepicker', 'month');
      datepicker.isDatePickerBodyExistAndCorrect('month');
      datepicker.isDatePickerTriggerCorrect('month');
    });

    it('when user clicks on month and "‹" button - previous year in head block shown', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('month');
      datepicker.clickOnNavigation('<');
      datepicker.isDatePickerBodyExistAndCorrect('month');
      datepicker.isVisibleMonthOrYearEqual((new Date().getFullYear() - 1).toString());
    });

    it('when user clicks on month and "›" button - next year in head block shown', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('month');
      datepicker.clickOnNavigation('>');
      datepicker.isDatePickerBodyExistAndCorrect('month');
      datepicker.isVisibleMonthOrYearEqual((new Date().getFullYear() + 1).toString());
    });

    it('when user clicks on month and then on any month - this month shown in head block, dates mode', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('month');
      datepicker.clickOnDatepickerTableItem('datepicker', 'month', 5);
      datepicker.isDatePickerBodyExistAndCorrect('date');
      datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[5]);
    });

    it('when user clicks on year, then table with 16 years shown with year interval in head block', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('year');
      datepicker.isNavigationFullyActiveAndCorrect('datepicker', 'year');
      datepicker.isDatePickerBodyExistAndCorrect('year');
      datepicker.isDatePickerTriggerCorrect('year');
    });

    it('when user clicks on year and "‹" button - interval with previous 16 years shown', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('year');
      datepicker.clickOnNavigation('<');
      datepicker.isDatePickerBodyExistAndCorrect('year');
      datepicker.isVisibleMonthOrYearEqual(
        `${(new Date().getFullYear() - 7 - 16)} - ${(new Date().getFullYear() + 8 - 16)}`);
    });

    it('when user clicks on year and "›" button - interval with next 16 years shown', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('year');
      datepicker.clickOnNavigation('>');
      datepicker.isDatePickerBodyExistAndCorrect('year');
      datepicker.isVisibleMonthOrYearEqual(
        `${(new Date().getFullYear() - 7 + 16)} - ${(new Date().getFullYear() + 8 + 16)}`);
    });

    it('when user clicks on year and any year - then it shown in head block and table with 12 months shown', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('year');
      datepicker.clickOnDatepickerTableItem('datepicker', 'year', 2);
      datepicker.isDatePickerBodyExistAndCorrect('month');
      datepicker.isVisibleMonthOrYearEqual(`${(new Date().getFullYear() - 7 + 2)}`);
    });

    it('when user clicks on year and any year - then it shown in head block and table with 12 months shown', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('year');
      datepicker.clickOnDatepickerTableItem('datepicker', 'year', 2);
      datepicker.isDatePickerBodyExistAndCorrect('month');
      datepicker.isVisibleMonthOrYearEqual(`${(new Date().getFullYear() - 7 + 2)}`);
    });

    it('when user clicks on: year mode => year => any month - then this month, year shown with dates mode', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('year');
      datepicker.clickOnDatepickerTableItem('datepicker', 'year', 0);
      datepicker.clickOnDatepickerTableItem('datepicker', 'month', 0);
      datepicker.isDatePickerBodyExistAndCorrect('date');
      datepicker.isNavigationFullyActiveAndCorrect(
        'datepicker', 'date', datepicker.monthNames[0], (new Date().getFullYear() - 7).toString());
    });

    it('when user clicks on any date - then this date appeared in the input in format "mm/dd/yyyy"', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnDatepickerTableItem('datepicker', 'date', undefined, '10');
      datepicker.isInputValueEqual(basic, `${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
    });

    it('when user chose date and click on "Datepicker" again, container opened and chosen date selected', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnDatepickerTableItem('datepicker', 'date', undefined, '10');
      datepicker.clickOnDatepickerInput(basic);
      datepicker.isSelectedDateExist('datepicker', true, '10');
    });

    it('when user clears input, add date in format "mm.dd.yyyy", click "Enter" - it converted to "mm/dd/yyyy"', () => {
      datepicker.clearInputAndSendKeys(basic, '05.10.2015', 0);
      datepicker.clickEnterOnInput(basic);
      datepicker.clickOnDatepickerInput(basic);
      datepicker.isSelectedDateExist('datepicker', true, '10');
      datepicker.isNavigationFullyActiveAndCorrect('datepicker', 'date', datepicker.monthNames[4], '2015');
    });
  });
});
