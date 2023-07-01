import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    //LEARNING: Array.isArray(data)- checks whether its actual array or not
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //renderSpinner(): SHOWING A LOADING SPINNER
  renderSpinner() {
    const markup = `
          <div class="spinner">
              <svg>
                <use href="${icons}.svg#icon-loader"></use>
              </svg>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //renderError(): renders the error message in a nice way
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //renderSuccess(): renders the success message in a nice way
  renderSuccess(message = this._message) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}.svg#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //clear(): its available to all views as long as all views have #parentElement property. It basically removes any previous content inside parentELemet
  _clear() {
    this._parentElement.innerHTML = ''; //removing old markup of recipe container
  }
}
