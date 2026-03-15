# BarterNext - Guide de Publication Android

## Configuration AdMob intégrée
- **App ID:** ca-app-pub-4158428587635293~2420456184
- **Banner ID:** ca-app-pub-4158428587635293/5881473210
- **Interstitial ID:** ca-app-pub-4158428587635293/9018446976

## Prérequis pour générer le fichier AAB

1. **Android Studio** (dernière version)
   - Télécharger: https://developer.android.com/studio

2. **Java JDK 17+**
   - Télécharger: https://adoptium.net/

## Étapes pour générer le fichier AAB

### Option 1: Via Android Studio (Recommandé)

1. **Ouvrir le projet Android**
   ```
   Ouvrir Android Studio → File → Open → Sélectionner: /app/frontend/android
   ```

2. **Créer un Keystore (première fois)**
   ```
   Build → Generate Signed Bundle/APK → Android App Bundle
   → Create new... → Remplir les informations
   ```
   
   Informations suggérées:
   - Key store path: `barternext-release.keystore`
   - Password: (votre mot de passe sécurisé)
   - Alias: `barternext`
   - Validity: 25 years
   - First and Last Name: Votre nom
   - Organization: BarterNext

3. **Générer le AAB signé**
   ```
   Build → Generate Signed Bundle/APK → Android App Bundle
   → Sélectionner le keystore → Next
   → Build Variants: release → Finish
   ```

4. **Localiser le fichier AAB**
   ```
   android/app/release/app-release.aab
   ```

### Option 2: Via ligne de commande

```bash
# Naviguer vers le dossier Android
cd /app/frontend/android

# Créer un keystore
keytool -genkey -v -keystore barternext-release.keystore \
  -alias barternext -keyalg RSA -keysize 2048 -validity 9125 \
  -storepass VOTRE_MOT_DE_PASSE -keypass VOTRE_MOT_DE_PASSE \
  -dname "CN=BarterNext, OU=Mobile, O=BarterNext, L=Paris, C=FR"

# Ajouter la config signing dans app/build.gradle
# (voir section signingConfigs ci-dessous)

# Générer le AAB
./gradlew bundleRelease

# Le fichier sera dans:
# app/build/outputs/bundle/release/app-release.aab
```

## Configuration signing pour build.gradle

Ajoutez dans `android/app/build.gradle`:

```groovy
android {
    signingConfigs {
        release {
            storeFile file("../barternext-release.keystore")
            storePassword "VOTRE_MOT_DE_PASSE"
            keyAlias "barternext"
            keyPassword "VOTRE_MOT_DE_PASSE"
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

## Publication sur Google Play Console

1. **Créer une application** sur https://play.google.com/console

2. **Configurer les informations**
   - Nom: BarterNext
   - Description courte (FR): Échangez des biens et services sans argent
   - Description courte (AR): تبادل السلع والخدمات بدون نقود
   - Catégorie: Shopping / Lifestyle

3. **Télécharger le AAB**
   - Production → Create new release → Upload AAB

4. **Configurer AdMob**
   - Dans AdMob Console, liez votre app Play Store
   - Activez les annonces pour la production

## Structure des fichiers Android

```
/app/frontend/android/
├── app/
│   ├── src/main/
│   │   ├── AndroidManifest.xml  (avec AdMob App ID)
│   │   ├── assets/public/       (web assets)
│   │   └── res/                 (icônes, splash)
│   └── build.gradle             (configuration)
├── capacitor.config.json
└── gradle/
```

## Icônes de l'application

Remplacez les icônes par défaut dans:
- `android/app/src/main/res/mipmap-hdpi/`
- `android/app/src/main/res/mipmap-mdpi/`
- `android/app/src/main/res/mipmap-xhdpi/`
- `android/app/src/main/res/mipmap-xxhdpi/`
- `android/app/src/main/res/mipmap-xxxhdpi/`

Utilisez Android Asset Studio: https://romannurik.github.io/AndroidAssetStudio/

## Support

Pour toute question, consultez:
- Capacitor: https://capacitorjs.com/docs/android
- AdMob: https://developers.google.com/admob/android/quick-start
- Play Console: https://support.google.com/googleplay/android-developer
