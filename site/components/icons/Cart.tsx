const Cart = ({ ...props }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      {...props}
      viewBox="0 0 64 64"
    >
      <path
        fill="none"
        d="M14 17.44h46.79l-7.94 25.61H20.96l-9.65-35.1H3"
      ></path>
      <circle cx="27" cy="53" r="2"></circle>
      <circle cx="47" cy="53" r="2"></circle>
    </svg>
  )
}

export default Cart
