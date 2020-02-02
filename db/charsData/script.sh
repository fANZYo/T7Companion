rm -r csv
mkdir csv

for f in *.json ; do
	echo "converting $f"
	in2csv "$f" > "./csv/$(echo $f | sed s/json/csv/)" ;
done

csvstack ./csv/*.csv > ../movelist.csv
