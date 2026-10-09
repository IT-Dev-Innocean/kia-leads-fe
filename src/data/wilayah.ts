const WILAYAH_API = 'https://www.emsifa.com/api-wilayah-indonesia/v2';

export type Region = {
  id: string;
  name: string;
};

type RegionResponse = {
  data: Region[];
};

async function getRegions(path: string) {
  const response = await fetch(`${WILAYAH_API}${path}`);
  if (!response.ok) {
    throw new Error('Gagal memuat data wilayah.');
  }

  const body = (await response.json()) as RegionResponse;
  return body.data
    .map(({ id, name }) => ({ id, name }))
    .sort((left, right) => left.name.localeCompare(right.name, 'id'));
}

export function getProvinces() {
  return getRegions('/provinces.json');
}

export function getCities(provinceId: string) {
  return getRegions(`/regencies/${provinceId}.json`);
}
