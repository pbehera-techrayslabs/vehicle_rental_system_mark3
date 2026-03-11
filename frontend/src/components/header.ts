class Myheader extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <header class="bg-blue-600 text-white p-6 shadow-md flex items-center justify-between">
        <h1 class="text-3xl font-bold grow">Vehicle Rental System</h1>
        <a href="/frontend/index.html" 
           class="ml-4 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded font-semibold">
          Home
        </a>
      </header>
    `;
  }
}

customElements.define('my-header', Myheader);