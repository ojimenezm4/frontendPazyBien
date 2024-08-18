import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  max-width: 500px;
  width: 100%;
`;

const StyledInput = styled(Input)`
  padding: 12px 16px;
  padding-left: 40px;
  border-radius: 10px;
  border: 2px solid #d9d9d9;
  font-size: 16px;
  transition: all 0.3s;

  &:hover, &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const SearchIcon = styled(SearchOutlined)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #bfbfbf;
  font-size: 18px;
  transition: all 0.3s;

  ${StyledInput}:focus + & {
    color: #40a9ff;
  }
`;

const SearchBar = ({ placeholder, onChange }) => (
  <SearchWrapper>
    <StyledInput
      placeholder={placeholder}
      onChange={onChange}
    />
    <SearchIcon />
  </SearchWrapper>
);

export default SearchBar;