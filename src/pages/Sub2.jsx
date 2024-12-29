import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { supabase } from '../lib/supabase';
import './Sub2.css'; // Import the CSS file for styling

const Sub2 = () => {
  const [verbs, setVerbs] = useState([]);
  const [selectedVerb, setSelectedVerb] = useState(null);
  const [verbDetails, setVerbDetails] = useState(null);

  useEffect(() => {
    const fetchVerbs = async () => {
      const { data, error } = await supabase
        .from('conjugations')
        .select('spanish_verb');
      if (error) {
        console.error('Error fetching verbs:', error);
      } else {
        const verbOptions = data.map(verb => ({
          value: verb.spanish_verb,
          label: verb.spanish_verb
        }));
        setVerbs(verbOptions);
      }
    };

    fetchVerbs();
  }, []);

  const handleVerbChange = async selectedOption => {
    setSelectedVerb(selectedOption);
    const { data, error } = await supabase
      .from('conjugations')
      .select('spanish_verb, english_verb, pres_ind_1s, pres_ind_2s, pres_ind_3s, pres_ind_1p, pres_ind_2p, pres_ind_3p')
      .eq('spanish_verb', selectedOption.value)
      .single();
    if (error) {
      console.error('Error fetching verb details:', error);
    } else {
      setVerbDetails(data);
    }
  };

  return (
    <div className="submenu-page">
      <h1>Conjugations</h1>
      <Select
        options={verbs}
        onChange={handleVerbChange}
        placeholder="Select a Spanish verb..."
        isSearchable
        styles={{
          control: (provided) => ({
            ...provided,
            borderRadius: '8px',
          }),
          option: (provided) => ({
            ...provided,
            color: 'black',
          }),
        }}
      />
      {verbDetails && (
        <div className="verb-details">
          <h2>{verbDetails.spanish_verb}</h2>
          <p>English Verb: {verbDetails.english_verb}</p>
          <p>Present Indicative 1st Singular: {verbDetails.pres_ind_1s} - Example: Yo {verbDetails.pres_ind_1s}.</p>
          <p>Present Indicative 2nd Singular: {verbDetails.pres_ind_2s} - Example: Tú {verbDetails.pres_ind_2s}.</p>
          <p>Present Indicative 3rd Singular: {verbDetails.pres_ind_3s} - Example: Él/Ella {verbDetails.pres_ind_3s}.</p>
          <p>Present Indicative 1st Plural: {verbDetails.pres_ind_1p} - Example: Nosotros {verbDetails.pres_ind_1p}.</p>
          <p>Present Indicative 2nd Plural: {verbDetails.pres_ind_2p} - Example: Vosotros {verbDetails.pres_ind_2p}.</p>
          <p>Present Indicative 3rd Plural: {verbDetails.pres_ind_3p} - Example: Ellos/Ellas {verbDetails.pres_ind_3p}.</p>
        </div>
      )}
    </div>
  );
};

export default Sub2;