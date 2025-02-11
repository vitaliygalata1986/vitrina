function Header() {
  return (
    <nav className='green darken-1'>
      <div className='nav-wrapper'>
        <div className='brand-logo'>React Shop</div>
        <ul id='nav-mobile' className='right'>
          <li>
            <a
              href='https://github.com/vitaliygalata1986/vitrina'
              target='_blank'
              rel='noreferrer'
            >
              Link to GitHub repository
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export { Header };
