import { LogoProps } from "@/types/logo";

function Logo({
  className,
}: LogoProps): React.JSX.Element {
  return (
    <img src="/images/logo-nixtla-black.png" alt="Nixtla Logo" className={`${className}`} />
  );
}
export default Logo;
