import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

// AdMob Configuration
const ADMOB_CONFIG = {
  appId: 'ca-app-pub-4158428587635293~2420456184',
  bannerId: 'ca-app-pub-4158428587635293/5881473210',
  interstitialId: 'ca-app-pub-4158428587635293/9018446976',
};

class AdMobService {
  constructor() {
    this.isInitialized = false;
    this.isBannerShowing = false;
  }

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      await AdMob.initialize({
        requestTrackingAuthorization: true,
        initializeForTesting: false,
      });
      this.isInitialized = true;
      console.log('AdMob initialized successfully');
    } catch (error) {
      console.error('AdMob initialization error:', error);
    }
  }

  async showBanner() {
    if (!this.isInitialized) await this.initialize();
    if (this.isBannerShowing) return;

    try {
      const options = {
        adId: ADMOB_CONFIG.bannerId,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: false,
      };

      await AdMob.showBanner(options);
      this.isBannerShowing = true;
      console.log('Banner ad shown');
    } catch (error) {
      console.error('Show banner error:', error);
    }
  }

  async hideBanner() {
    if (!this.isBannerShowing) return;

    try {
      await AdMob.hideBanner();
      this.isBannerShowing = false;
      console.log('Banner ad hidden');
    } catch (error) {
      console.error('Hide banner error:', error);
    }
  }

  async prepareInterstitial() {
    if (!this.isInitialized) await this.initialize();

    try {
      const options = {
        adId: ADMOB_CONFIG.interstitialId,
        isTesting: false,
      };

      await AdMob.prepareInterstitial(options);
      console.log('Interstitial ad prepared');
      return true;
    } catch (error) {
      console.error('Prepare interstitial error:', error);
      return false;
    }
  }

  async showInterstitial() {
    try {
      await AdMob.showInterstitial();
      console.log('Interstitial ad shown');
      return true;
    } catch (error) {
      console.error('Show interstitial error:', error);
      this.prepareInterstitial();
      return false;
    }
  }

  async showInterstitialIfReady() {
    const prepared = await this.prepareInterstitial();
    if (prepared) {
      setTimeout(async () => {
        await this.showInterstitial();
      }, 500);
    }
  }
}

const admobService = new AdMobService();
export default admobService;

export const useAdMob = () => {
  return {
    initialize: () => admobService.initialize(),
    showBanner: () => admobService.showBanner(),
    hideBanner: () => admobService.hideBanner(),
    showInterstitial: () => admobService.showInterstitialIfReady(),
  };
};
