import FilterComponent from '../components/filter-component.js';
import {render, replace} from '../utils/render.js';
import {FilterType, MenuItem} from '../data.js';

const createNewEventButton = document.querySelector(`.trip-main__event-add-btn`);

export default class FilterController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._filterComponent = null;
    this._activeFilterType = FilterType.EVERYTHING;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const appFilters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        checked: filterType === this._activeFilterType
      };
    });

    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(appFilters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent);
    }
  }

  setDefaultView(menuItem = MenuItem.TABLE) {
    this._eventsModel.setFilter(FilterType.EVERYTHING);
    this._activeFilterType = FilterType.EVERYTHING;
    this.render();
    return menuItem === MenuItem.STATS ? this._filterComponent.setDisableInputs() : this._filterComponent.removeDisableInputs();
  }

  disableEmptyFilter(currentFilter) {
    this._filterComponent.disableEmptyFilter(currentFilter);
  }

  _onFilterChange(filterType) {
    createNewEventButton.disabled = false;
    this._eventsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
