import _ from 'lodash';
import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import {DetailImage} from "../common-components/detail/detail-image";

interface LocationProp {
  coordinates?: any[];
}

interface PhotosProp {
  path: string;
  author: string;
  caption?: string;
  time?: string;
  location?: string | LocationProp;
  thumbnail?: string;
  alt?: string;
  hash?: string;
}

interface ImageGalleryProps {
  photos?: PhotosProp[] | PhotosProp;
  label: string;
  isHorizontal: boolean;
  labelWidth?: number;
  name: string;
}

const getClassName = (labelWidth: number | null | undefined, labelStart: boolean) => {
  const classes: string[] = [];
  
  if (labelStart) {
    if (labelWidth) {
      classes.push(`col-xl-${labelWidth}`);
      classes.push(`col-md-${labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-3`);
      classes.push(`col-md-3`);
      classes.push('col-12');
    }
  } else {
    if (labelWidth) {
      classes.push(`col-xl-${12 - labelWidth - 1}`);
      classes.push(`col-md-${12 - labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-8`);
      classes.push(`col-md-9`);
      classes.push('col-12');
    }
  }
  
  return classes.join(' ');
};

const ImageDetail = ({
                       image,
                       isShow,
                       onHide,
                     }: {
  image: PhotosProp;
  isShow: boolean;
  onHide: () => void;
}) => {
  return (
    <Modal size="sm" show={isShow} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      <img src={image.path} alt={image.alt ? image.alt : ''} width="100%"/>
      <div className="mt-5 pl-5">
        <p>Người chụp: {image.author}</p>
        <p>Thời gian: {image.time ? image.time : 'Không có thông tin'}</p>
        <p>
          Địa điểm:
          {image.location && !_.isString(image.location) && _.isArray(image.location.coordinates) && image.location.coordinates.length > 0
            ? _.toString(image.location.coordinates)
            : 'không có thông tin'}
        </p>
      </div>
    </Modal>
  );
};

function ImgGallery({
                      photos,
                      label,
                      isHorizontal = false,
                      labelWidth,
                      name,
                    }: ImageGalleryProps) {
  const [_isShow, setShow] = useState<boolean>(false);
  const [_currentImage, setCurrentImage] = useState<PhotosProp>({
    path: '',
    author: '',
  });
  
  const hideModal = () => {
    setShow(false);
  };
  
  const handleClickImage = (values: PhotosProp) => {
    setCurrentImage(values);
    setShow(true);
  };
  
  return (
    <>
      <ImageDetail image={_currentImage} isShow={_isShow} onHide={hideModal}/>
      
      <div className={isHorizontal ? 'row' : ''}>
        <div className={isHorizontal ? getClassName(labelWidth, true) : ''}>
          {label && <label className={isHorizontal ? 'mb-0 mt-2' : ''}>{label}</label>}
        </div>
        
        <div className={isHorizontal ? getClassName(labelWidth, false) : ''}>
          <DetailImage images={photos}/>
          {/*{mode === 'multiple' &&*/}
          {/*  _.isArray(photos) &&*/}
          {/*  photos.map((value: PhotosProp, key: number) => (*/}
          {/*    <React.Fragment key={key}>*/}
          {/*      <img*/}
          {/*        src={value.path}*/}
          {/*        alt={value.alt ? value.alt : ''}*/}
          {/*        width="150px"*/}
          {/*        onClick={() => handleClickImage(value)}*/}
          {/*      />*/}
          {/*    </React.Fragment>*/}
          {/*  ))}*/}
          {/*{mode === 'single' && photo && (*/}
          {/*  <React.Fragment>*/}
          {/*    <img*/}
          {/*      src={photo.path}*/}
          {/*      alt={photo.alt ? photo.alt : ''}*/}
          {/*      width="150px"*/}
          {/*      onClick={() => handleClickImage(photo)}*/}
          {/*    />*/}
          {/*  </React.Fragment>*/}
          {/*)}*/}
        </div>
      </div>
    </>
  );
}

export default ImgGallery;
