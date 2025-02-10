export interface Price {
  regularPrice: number;
  finalPrice: number;
  floorPrice: number;
}

export interface DisplayAsset {
  displayAsset: string;
  materialInstance: string;
  primaryMode: string;
  productTag: string;
  url: string;
  background: string;
  background_texture: string | null;
  flipbook: string | null;
  full_background: string;
}

export interface GoodsItemProps {
  mainId: string;
  displayName: string;
  displayDescription: string; // В TypeScript пустая строка ("") считается допустимым значением для типа string
  price: Price;
  displayAssets: DisplayAsset[];
}
