import Image from "next/image";

type CoinIconProps = {
  id: string;
  image: string;
  tailwindSize: string;
};

export function CoinIcon({ id, image, tailwindSize }: CoinIconProps) {
  return (
    <div className={`relative ${tailwindSize} transition-transform duration-300 hover:-rotate-36`}>
      <Image src={image} alt={`${id} logo`} className="object-contain" sizes={tailwindSize} fill />
    </div>
  );
}