# Script pour créer une nouvelle page de l'application react Typescript

import sys
import os

# Récupération du nom de la page
if len(sys.argv) != 2:
    print("Usage: python3 newPage.py <nom_page>")
    sys.exit()
    
pageName = sys.argv[1]

# Création du dossier de la page
cheminDesPages = "./src/Pages/"
cheminDeLaPage = cheminDesPages + pageName
os.mkdir(cheminDeLaPage)

# Création du fichier index.tsx
fichierIndex = open(cheminDeLaPage + "/index.tsx", "w")
fichierIndex.write("import "+ pageName + " from './"+ pageName + "';\n\n")
fichierIndex.write("export default " + pageName + ";")

# Création du fichier <nom_page>.tsx
fichierPage = open(cheminDeLaPage + "/" + pageName + ".tsx", "w")
fichierPage.write("import styles from './" + pageName + ".module.css';\n")
fichierPage.write("\n")
fichierPage.write("export default function " + pageName + "() {\n")
fichierPage.write("\treturn (\n")
fichierPage.write("\t\t<div>\n")
fichierPage.write("\t\t\t<h1 className={styles.h1}>" + pageName + "</h1>\n")
fichierPage.write("\t\t</div>\n")
fichierPage.write("\t);\n")
fichierPage.write("}")

# Création du fichier <nom_page>.module.css
fichierCSS = open(cheminDeLaPage + "/" + pageName + ".module.css", "w")
fichierCSS.write(".h1 {\n")
fichierCSS.write("\tcolor: red;\n")
fichierCSS.write("}")

fichierCSS.close()
fichierPage.close()
fichierIndex.close()

print("Page " + pageName + " créée avec succès !")


# Edition de ./src/Pages/index.tsx
fichierIndex = open(cheminDesPages + "index.tsx", "a")

# fichier écrit comme :
# import page1 from './page1';
# import page2 from './page2';
# ...
# export { page1, page2, ... };

fichierIndex.write("import " + pageName + " from './" + pageName + "';\n")
fichierIndex.write("export { " + pageName + " };")