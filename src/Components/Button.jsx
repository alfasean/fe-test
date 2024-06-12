import Button from 'react-bootstrap/Button';

function TagTypesExample({ type, variant, value, name, href, className, onClick }) {
  return (
    <>
      <Button onClick={onClick} className={className} href={href} type={type} variant={variant} value={value}>{name}</Button>{' '}{' '}
    </>
  );
}

export default TagTypesExample;