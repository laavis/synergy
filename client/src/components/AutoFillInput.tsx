import {
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { Input } from './Input';
import { Body } from './Text';

const StyledAutoFillInput = styled.div`
  position: relative;
`;

const BestMatch = styled(Body)`
  position: absolute;
  right: 0.5rem;
  top: 1.85rem;
  opacity: 0.6;
`;

interface IAutoFillInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  possibleValues: string[];
}

export const AutoFillInput: FC<IAutoFillInputProps> = ({
  value,
  setValue,
  possibleValues,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [bestMatch, setBestMatch] = useState<string>();

  const handleChange = (e: SyntheticEvent) => {
    const value = (e.currentTarget as HTMLInputElement).value;
    setValue(value);

    const filteredBestMatches = possibleValues.filter(
      possibleValue =>
        possibleValue.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    value && setBestMatch(filteredBestMatches[0]);
  };

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.addEventListener('keyup', ({ key }) => {
      if (key === 'Enter' && bestMatch) {
        setValue(bestMatch);
      }
    });
  }, [inputRef, value, setValue, bestMatch]);

  return (
    <StyledAutoFillInput>
      <Input
        value={value}
        ref={inputRef}
        label='Language'
        onChange={e => handleChange(e)}
      />
      {value !== bestMatch && <BestMatch>{bestMatch}</BestMatch>}
    </StyledAutoFillInput>
  );
};
