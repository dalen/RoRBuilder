#!/bin/bash

for iconLine in $(grep "Icon *id=" ../../../Data-Master/INTERFACE.MYP/interface/default/eatemplate_icons/source/icons.xml|gsed -e 's/.*Icon id="//'|gsed -e 's/".* texture="/-/'|gsed -e 's/".*//')
do
  iconId=$(echo "${iconLine}"|cut -d- -f1 |gsed -e 's/^0*//')
  echo $iconId
  iconTexture=$(echo "${iconLine}"|cut -d- -f2|tr '[:upper:]' '[:lower:]')

  convert "../../../Data-Master/INTERFACE.MYP/interface/default/eatemplate_icons/${iconTexture}" ./${iconId}.png
done
