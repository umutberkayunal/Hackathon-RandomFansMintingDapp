import Header from "../../src/components/Header";
import styles from './index.module.scss';
import {useEffect} from "react";
import {getTokensOfOwner} from "../../src/utils/interact";
import {observer} from "mobx-react";
import {appStore} from "../../src/store";

const WalletPage = observer(() => {
  useEffect(() => {
    (async () => {
      await getTokensOfOwner();
    })();
  }, []);
  return (
    <div className="min-h-screen w-full bg-primary">
      <Header/>
      <main id="main" className={styles.main}>
        <div className="container pt-4">
          <div className="row">
            {appStore?.tokenList?.length > 0 ? appStore?.tokenList?.map((token, key) => (
              <div key={key} className="col-12 col-md-3 col-lg-3 mt-4">
                <div className={styles.tokenItem}>
                  <img className={styles.tokenImg} src={token.image} alt={token.name}/>
                  <div className={styles.tokenName}>{token.name}</div>
                  <div className={styles.propertiesContainer}>
                    <div className={styles.propertiesHeadTitle}>Properties</div>
                    <hr/>
                    {token.attributes?.map((property, index) => (
                      <div className={styles.propertyItem} key={index}>
                        <span className={styles.label}>{property.trait_type}</span>
                        <span className={styles.value}>{property.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )) : <h3 className={styles.tokenItem}>
              <div className={'text-center'}>Sonuç bulunamadı</div>
            </h3>}
          </div>
        </div>
      </main>
    </div>
  )
})
export default WalletPage;
