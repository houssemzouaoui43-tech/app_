# 🚀 Guide pour obtenir votre fichier AAB BarterNext

## Le problème
Notre serveur utilise une architecture ARM64, mais les outils de build Android (AAPT2) ne sont disponibles que pour x86_64. Il est donc impossible de générer le fichier AAB directement sur ce serveur.

## ✅ Solutions disponibles

### Option 1: GitHub Actions (GRATUIT - Recommandé)

C'est la méthode la plus simple si vous n'avez pas d'ordinateur.

**Étapes:**

1. **Créez un compte GitHub** (gratuit) : https://github.com/signup

2. **Téléchargez le projet** depuis Emergent (bouton Download)

3. **Créez un nouveau repository** sur GitHub et uploadez les fichiers

4. **Le workflow de build se lancera automatiquement** et générera le fichier AAB

5. **Téléchargez le fichier AAB** depuis l'onglet "Actions" → "Artifacts"

---

### Option 2: Codemagic (GRATUIT - 500 builds/mois)

1. Allez sur https://codemagic.io
2. Connectez votre repo GitHub
3. Configurez un build Android
4. Téléchargez le AAB généré

---

### Option 3: AppCenter de Microsoft (GRATUIT)

1. Allez sur https://appcenter.ms
2. Créez une app Android
3. Connectez votre repo
4. Lancez un build

---

### Option 4: Expo EAS Build (Si vous migrez vers Expo)

1. Installez Expo CLI: `npm install -g expo-cli eas-cli`
2. Convertissez le projet vers Expo
3. Lancez: `eas build --platform android`

---

## 📱 Configuration AdMob déjà intégrée

Vos codes AdMob sont configurés dans:
- `android/app/src/main/AndroidManifest.xml`
- `src/services/admob.js`
- `capacitor.config.json`

**IDs configurés:**
- App ID: `ca-app-pub-4158428587635293~2420456184`
- Banner: `ca-app-pub-4158428587635293/5881473210`
- Interstitial: `ca-app-pub-4158428587635293/9018446976`

---

## 🔐 Pour la signature (Google Play)

Vous devrez créer un keystore. Utilisez cette commande sur n'importe quel PC avec Java:

```bash
keytool -genkey -v -keystore barternext-release.keystore \
  -alias barternext -keyalg RSA -keysize 2048 -validity 10000
```

**IMPORTANT:** Gardez ce fichier keystore en sécurité ! Vous en aurez besoin pour toutes les futures mises à jour.

---

## 📞 Besoin d'aide ?

Si vous avez besoin d'aide pour configurer GitHub Actions ou une autre solution, je suis là pour vous guider étape par étape !
