type LinkEmbedProps = {
  linkUrl?: string;
};

const LinkEmbed = ({ linkUrl }: LinkEmbedProps) => {
  return <iframe src={linkUrl} className='min-h-[400px] w-full' />;
};

export default LinkEmbed;
