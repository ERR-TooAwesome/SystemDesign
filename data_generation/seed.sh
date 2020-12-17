#!/bin/bash
DIR="$( cd .. &&  cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SCHEMA="$DIR/schema.sql"

psql -h localhost -p 5432 -U postgres < $SCHEMA

psql -h localhost -p 5432 -U root -d q_a -c "COPY questions FROM '$DIR/data_generation/questions.csv' CSV HEADER";
psql -h localhost -p 5432 -U root -d q_a -c "COPY answers FROM '$DIR/data_generation/answers.csv' CSV HEADER";

echo duration=$(( SECONDS - start ))

# psql -h localhost -p 5432 -U root -d q_a -c "COPY questions FROM '/Users/jtlettmannJT/Documents/HR/SDC/SystemDesign/data_generation/questions.csv' CSV HEADER";
# COPY answers FROM '/Users/jtlettmannJT/Documents/HR/SDC/SystemDesign/data_generation/answers.csv' CSV HEADER;
# COPY questions FROM '/Users/jtlettmannJT/Documents/HR/SDC/SystemDesign/data_generation/questions.csv' CSV HEADER;
# psql -h localhost -p 5432 < /Users/jtlettmannJT/Documents/HR/SDC/SystemDesign/schema.sql