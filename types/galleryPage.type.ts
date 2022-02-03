export type GalleryPageData = {
  id: string;
  label: string;
  CloseIcon: string;
  DocumentID: string;
  GalleryTitle: string;
  GallerySubTitle: string;
  Data: { ImgDesc: string; ImgLocation?: string; ImgSrc: string }[];
};
