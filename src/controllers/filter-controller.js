import FilterComponent from '../components/filter-component.js';
import {render, replace} from '../utils/render.js';
import {getFilteredEvents} from '../utils/filter.js';
import {FilterType} from '../data.js';

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
        checked: filterType === this._activeFilterType,
        disabled: getFilteredEvents(this._eventsModel.getEventsAll(), filterType).length === 0 ? true : false
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

  _onFilterChange(filterType) {
    this._eventsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
