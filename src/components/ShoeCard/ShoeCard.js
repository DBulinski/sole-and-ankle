import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <div>
            <Name>{name}</Name>
            <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          </div>
          <Price>
            <StandardPrice $isOnSale={variant === "on-sale"}>{formatPrice(price)}</StandardPrice>
            {variant === "on-sale" && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
          </Price>
        </Row>
      </Wrapper>
      {variant === "on-sale" ? <OnSale>Sale</OnSale> : variant === "new-release" ? <NewRelease>Just Released!</NewRelease> : <></>}
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1;
  min-width: 320px;
  position: relative;
`;

const Wrapper = styled.article`
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
`;

const Label = styled.aside`
  position: absolute;
  top: 12px;
  right: -4px;
  color: ${COLORS.white};
  font-weight: 700;
  font-size: 0.875rem;
  padding: 7px 9px 9px 11px;
  border-radius: 2px;
`

const OnSale = styled(Label)`
  background-color: ${COLORS.primary};
`

const NewRelease = styled(Label)`
  background-color: ${COLORS.secondary};
`

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const StandardPrice = styled.span`
  text-decoration: ${({ $isOnSale }) => $isOnSale ? "line-through" : "none"};
  color: ${({ $isOnSale }) => $isOnSale ? COLORS.gray[700] : "inherit"}
`

const Price = styled.span`
  display: flex;
  flex-direction: column;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
