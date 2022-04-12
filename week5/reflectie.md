# Opdracht toelichting
## Data 
De heart disease dataset beschikbaar op kaggle. Het is een dataset van CDC en beschikt over meer dan 400.000 resultaten. Ik gebruik maar 10.000 resulataten

## Accuracy
De accuracy is tussen de 88% en 90%. Ik kan de accuracy verbeteren door meer data van de dataset te gebruiken of door bepaalde categorieën van de data te vermijden, zoals bijvoorbeeld BMI.

## Extra uitdaging
Ik heb gebruikgemaakt van een andere dataset op kaggle en ik heb een confusion matrix gemaakt. Beide uitdaging zijn succesvol afgerond.


# Reflectie
## Doel
Het doel van mijn experiment is om te voorspellen of mensen wel of geen hartklachten hebben.
## I/O Data
### Input
De input data is tekst uit .csv file. Deze data is survey data van de CDC. Er zijn 400.000 mensen voor gesurveilleerd, ik heb echter maar 10.000 resulaten van de survey gebruikt omdat het anders te lang zou duren om te verwerken voor mijn browser. 

### Output
De output is een voorspelling of de persoon wel of geen hartklachten heeft gebaseerd op de informatie uit de data. Verder word verwerkt hoe de algoritme zijn keuze maakt met behulp van een grafiek die de decision tree laat zien. Ook is er een confusion matrix waarbij je kan zien welke fouten de algortime het meest maakt.

## Library
Er word gebruik gemaakt van de decision tree libary. Deze library zorgt ervoor dat we gebruik kunnen maken van de decision tree algoritme. Er word gebruik gemaakt van de vega library zodat we een grafiek kunnen weergeven van de decision tree. Verder maken we gebruik van papaparse, deze library parsed de data van .csv file naar json.

## Succes?
Ja, het doel is behaald. Ik heb een algoritme dat rond 90% goed kan gokken of een persoon hartklachten heeft. Verder weet ik nog niet of ik gebruik ga maken van dit algoritme in mijn eindproject. Ik waardeer de kennis wel. 

## Moeite?
Ik vond het makkelijk om de decision tree werkend te krijgen. Het moeilijkste vond ik een leuke dataset uitkiezen en ik was ook niet zeker over mijn resultaten. Zo had ik de mushroom dataset uitgetest en had ik een accuracy van rond de 60% terwijl mijn vriend rond 100% had. Ik snap nog steeds niet hoe het komt.


