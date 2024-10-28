type LinkEmbedProps = {
  linkUrl?: string;
};

const LinkEmbed = ({ linkUrl }: LinkEmbedProps) => {
  return <iframe src={linkUrl} className='h-full w-full' />;
};

export default LinkEmbed;
