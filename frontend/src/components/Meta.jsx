import{ Helmet } from 'react-helmet-async';

const Meta = ({title, decription, keywords }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={decription}/>
        <meta name='keywords' content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Welcome to MoshShop',
    decription: 'We Sell the best and most power efficient products!',
    keywords: 'electronics, buy electronics, cheap electronics',
}
export default Meta