export interface TypeUserSignUp {
  name: string;
  userName: string;
  email: string;
  password: string;
  address: string;
  telp: string;
  picture: string;
  products?: string[] | "";
  carts?: string[] | "";
  wishlists?: string[] | "";
  transactions?: string[] | "";
  seller?: string[] | "";
}
