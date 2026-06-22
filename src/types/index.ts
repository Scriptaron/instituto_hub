export interface SanityImageAsset {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
}

export interface Aula {
  _id: string;
  relCode: string;
  modality: 'Presencial' | 'Online' | 'Híbrido';
  title: string;
  instructor: string;
  time: string;
  weekday: 'terca' | 'quarta' | 'quinta' | 'sabado';
  description: string;
  image?: SanityImageAsset;
  whatsAppUrl?: string;
  zoomUrl?: string;
}

export interface Evento {
  _id: string;
  title: string;
  eventDate: string;
  tagLabel: string;
  detailsText: string;
  price?: string;
  buttonText: string;
  buttonUrl?: string;
}

export interface EventoFormatado extends Evento {
  monthId: string;
  dateMain: string;
  dateSub: string;
}

export interface DiaSemana {
  id: 'terca' | 'quarta' | 'quinta' | 'sabado';
  label: string;
}

export interface Mes {
  id: string;
  name: string;
}

export interface ThemeProps {
  dotColorClass: string;
  dotShadowClass: string;
  cardBgClass: string;
  cardShadowClass?: string;
  cardExtraClass?: string;
  connectorBorderClass: string;
  tagClass: string;
  titleClass: string;
  detailsClass?: string;
  detailsIconSvg?: string;
  buttonClass: string;
}
