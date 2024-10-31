import { useEffect, useState } from 'react';

const SecondsBefore = ({ at }: { at: Date }) => {
  const target = at.getSeconds();

  const [now, setNow] = useState(() => new Date().getSeconds());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(() => new Date().getSeconds());
    }, 250);

    return () => clearInterval(id);
  }, []);

  return <>{now - target}</>;
};

export default SecondsBefore;
