type Category = 'Sport' | 'Cruiser' | 'Touring' | 'Dirt' | 'Adventure' | 'Naked' | 'Electric'

interface Motorcycle {
  id: string;
  name: string;
  manufacturer: string;
  category: Category;
  price: number;
  image_url: string;
  created_at: Date;
  description: string;
  year: number;
}

async function fetchMotorcycles(): Promise<Motorcycle[]> {
  const response = await fetch(
    'https://cdn.freecodecamp.org/curriculum/labs/data/motorcycle-shop/motorcycles.json'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch motorcycles');
  }

  const data: Motorcycle[] = await response.json();

  return data;
}

function renderMotorcycleCard(motorcycle: Motorcycle): string {
  return `
    <div class="motorcycle-card">
      <img
        src="${motorcycle.image_url}"
        alt="${motorcycle.name}"
        class="motorcycle-card-image"
        width="100%"
        height="50%"
      />

      <span class="motorcycle-card-year-badge">
        ${motorcycle.year}
      </span>

      <h3 class="motorcycle-card-title">
        ${motorcycle.name}
      </h3>

      <p class="motorcycle-card-manufacturer">
        ${motorcycle.manufacturer}
      </p>

      <p class="motorcycle-card-category">
        ${motorcycle.category}
      </p>

      <p class="motorcycle-card-description">
        ${motorcycle.description}
      </p>

      <p class="motorcycle-card-price">
        $${motorcycle.price.toLocaleString()}
      </p>
    </div>
  `;
}

class MotorcycleGalleryApp {
  private allMotorcycles: Motorcycle[] = [];
  private filterTerm: string = '';

  public async loadData(): Promise<void> {
    this.allMotorcycles = await fetchMotorcycles();
  }

  public renderMotorcycles(): void {
    const motorcycleGrid = document.getElementById('motorcycle-grid');
    const resultsNumber = document.getElementById('results-number');

    if (!motorcycleGrid || !resultsNumber) return;

    const filteredMotorcycles = this.allMotorcycles.filter(
      (motorcycle) =>
        motorcycle.name.toLowerCase().includes(this.filterTerm.toLowerCase())
    );

    motorcycleGrid.innerHTML = filteredMotorcycles
      .map(renderMotorcycleCard)
      .join('');

    resultsNumber.textContent = String(filteredMotorcycles.length);
  }

  public setFilterTerm(value: string): void {
    this.filterTerm = value;
    this.renderMotorcycles();
  }
}

async function main(): Promise<void> {
  const app = new MotorcycleGalleryApp();

  await app.loadData();

  app.renderMotorcycles();

  const nameFilterInput = document.getElementById(
    'name-filter-input'
  ) as HTMLInputElement;

  nameFilterInput.addEventListener('input', () => {
    app.setFilterTerm(nameFilterInput.value);
  });
}

main();