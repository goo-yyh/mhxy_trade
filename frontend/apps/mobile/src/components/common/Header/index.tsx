import { NavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  back?: boolean;
}

export function Header({ title, back = false }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <NavBar onBack={back ? () => navigate(-1) : undefined} back={back ? '返回' : null}>
      {title}
    </NavBar>
  );
}
