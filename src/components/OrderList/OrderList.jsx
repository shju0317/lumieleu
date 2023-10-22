import { useState, useEffect, useCallback } from 'react';
import pb from '@/api/pocketbase';
import toast from 'react-hot-toast';
import Spinner from '../Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// import useStorage from '@/hooks/useStorage';
import {
  emailReg,
  userNameReg,
  shippingAddressReg,
  shippingAddressDetailsReg,
  phoneNumberFirstReg,
  phoneNumberSecondReg,
  phoneNumberThirdReg,
  landlinePhoneFirstReg,
  landlinePhoneSecondReg,
  landlinePhoneThirdReg,
} from '@/utils/validation';
import S from './OrderList.module.css';

const PB = import.meta.env.VITE_PB_URL;
const PB_CART_ENDPOINT = `${PB}/api/collections/cart/records`;

async function fetchProducts() {
  const response = await axios(PB_CART_ENDPOINT);
  return await response.data;
}

function OrderList() {
  const navigate = useNavigate();
  // const { storageData } = useStorage('pocketbase_auth');
  // const authUser = storageData?.model;
  const authUserId = 'w0ngk55y58ddbqr';
  const [userData, setUserData] = useState([]);
  const [selectedCartData, setSelectedCartData] = useState([]);
  const [saveUserId, setSaveUserId] = useState('');

  /* useEffect(() => {
    setSaveUserId(userId);
  }, [userId]); */

  const {
    isLoading,
    data: cartData,
    error,
  } = useQuery(['cart'], fetchProducts, {
    retry: 2,
  });

  let dataItems = cartData?.items || [];
  console.log('dataItems:', dataItems);

  if (Array.isArray(dataItems) && dataItems.length > 0) {
    dataItems.forEach((item) => {
      const userId = item.user;
      console.log('item userId:', userId);
    });
  }

  useEffect(() => {
    if (!isLoading && Array.isArray(dataItems) && dataItems.length > 0) {
      const filteredData = dataItems.filter(
        (item) => item.user === 'w0ngk55y58ddbqr' //authUser.name // authUser.id
      );

      if (filteredData.length > 0) {
        setSelectedCartData(filteredData);
      }
    }
  }, [isLoading, dataItems]);

  useEffect(() => {
    const getCartData = async () => {
      try {
        selectedCartData.forEach((item) => {
          console.log(item?.selectedSize)
          console.log(item?.selectedQuantity);
          console.log(item?.selectedTotal);
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getCartData();
  }, [selectedCartData]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await pb.collection('users').getFullList();
        /* const filteredUserData = userData.filter(
          (item) => item.id === authUserId
        ); */
        console.log('userData:', userData);
        /* if (filteredUserData) {
          console.log(filteredUserData[0]?.address);
          console.log(filteredUserData[0]?.userEmail);
          console.log(filteredUserData[0]?.name);
          setSaveUserId(filteredUserData.id);
        } */
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getUserData();
  }, []);

  // const userId = 인증 user id === cart user setUserId(userid)
  // const user = 인증 유저 id === cart 콜렉션의 user  // if 문으로 False / true 확인하여 노출

  const [formState, setFormState] = useState({
    email: '',
    userName: '',
    shippingAddress: '',
    shippingAddressDetails: '',
    phoneNumberFirst: '',
    phoneNumberSecond: '',
    phoneNumberThird: '',
    landlinePhoneFirst: '',
    landlinePhoneSecond: '',
    landlinePhoneThird: '',
    deliveryMessage: '',
  });

  const handlePaymentEvent = async (e) => {
    e.preventDefault();

    const selectedShippingAddress =
      formState.shippingAddress + formState.shippingAddressDetails;
    const selectedPhoneNumber =
      formState.phoneNumberFirst +
      formState.phoneNumberSecond +
      formState.phoneNumberThird;
    const landlinePhoneNumber =
      formState.landlinePhoneFirst +
      formState.landlinePhoneSecond +
      formState.landlinePhoneThird;
    const deliveryMessage =
      formState.deliveryMessage !== '' ? formState.deliveryMessage : '';

    const formData = new FormData();

    formData.append('user', saveUserId);
    formData.append('email', formState.email);
    formData.append('shippingAddress', selectedShippingAddress);
    formData.append('phoneNumber', selectedPhoneNumber);
    formData.append('landlinePhone', landlinePhoneNumber);
    formData.append('deliveryMessage', deliveryMessage);

    try {
      await pb.collection('orders').create({
        ...formData
      });
      toast.success('결제가 성공적으로 완료되었습니다', {
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      navigate('/lumieleu/mypage');
    } catch (error) {
      console.error(error);
      toast.error('결제에 실패했습니다', {
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }

    const {
      email,
      userName,
      shippingAddress,
      shippingAddressDetails,
      phoneNumberFirst,
      phoneNumberSecond,
      phoneNumberThird,
      landlinePhoneFirst,
      landlinePhoneSecond,
      landlinePhoneThird,
    } = formState;

    if (!validateEmail(email)) {
      return;
    }

    if (!validateShippingAddress(shippingAddress)) {
      return;
    }

    if (!validateShippingAddressDetails(shippingAddressDetails)) {
      return;
    }

    if (!validateUserName(userName)) {
      return;
    }

    if (!validatePhoneNumberFirst(phoneNumberFirst)) {
      return;
    }

    if (!validatePhoneNumberSecond(phoneNumberSecond)) {
      return;
    }

    if (!validatePhoneNumberThird(phoneNumberThird)) {
      return;
    }

    if (!validateLandlinePhoneFirst(landlinePhoneFirst)) {
      return;
    }

    if (!validateLandlinePhoneSecond(landlinePhoneSecond)) {
      return;
    }

    if (!validateLandlinePhoneThird(landlinePhoneThird)) {
      return;
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setFormState({
        ...formState,
        email: value,
      });
    } else if (name === 'shippingAddress') {
      setFormState({
        ...formState,
        shippingAddress: value,
      });
    } else if (name === 'shippingAddressDetails') {
      setFormState({
        ...formState,
        shippingAddressDetails: value,
      });
    } else if (name === 'userName') {
      setFormState({
        ...formState,
        userName: value,
      });
    } else if (name === 'phoneNumberFirst') {
      setFormState({
        ...formState,
        phoneNumberFirst: value,
      });
    } else if (name === 'phoneNumberSecond') {
      setFormState({
        ...formState,
        phoneNumberSecond: value,
      });
    } else if (name === 'phoneNumberThird') {
      setFormState({
        ...formState,
        phoneNumberThird: value,
      });
    } else if (name === 'landlinePhoneFirst') {
      setFormState({
        ...formState,
        landlinePhoneFirst: value,
      });
    } else if (name === 'landlinePhoneSecond') {
      setFormState({
        ...formState,
        landlinePhoneSecond: value,
      });
    } else if (name === 'landlinePhoneThird') {
      setFormState({
        ...formState,
        landlinePhoneThird: value,
      });
    } else if (name === 'deliveryMessage') {
      setFormState({
        ...formState,
        deliveryMessage: value,
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };
  console.log('formState:', formState);
  const validateEmail = (email) => {
    return emailReg(email);
  };

  const validateShippingAddress = (shippingAddress) => {
    return shippingAddressReg(shippingAddress);
  };

  const validateShippingAddressDetails = (shippingAddressDetails) => {
    return shippingAddressDetailsReg(shippingAddressDetails);
  };

  const validateUserName = (userName) => {
    return userNameReg(userName);
  };

  const validatePhoneNumberFirst = (phoneNmberFirst) => {
    return phoneNumberFirstReg(phoneNmberFirst);
  };

  const validatePhoneNumberSecond = (phoneNmberSecond) => {
    return phoneNumberSecondReg(phoneNmberSecond);
  };

  const validatePhoneNumberThird = (phoneNmberThird) => {
    return phoneNumberThirdReg(phoneNmberThird);
  };

  const validateLandlinePhoneFirst = (landlinePhoneFirst) => {
    return landlinePhoneFirstReg(landlinePhoneFirst);
  };

  const validateLandlinePhoneSecond = (landlinePhoneSecond) => {
    return landlinePhoneSecondReg(landlinePhoneSecond);
  };

  const validateLandlinePhoneThird = (landlinePhoneThird) => {
    return landlinePhoneThirdReg(landlinePhoneThird);
  };

  const [emailMsg, setEmailMsg] = useState('');
  const [shippingAddressMsg, setShippingAddressMsg] = useState('');
  const [shippingAddressDetailsMsg, setShippingAddressDetailsMsg] =
    useState('');
  const [userNameMsg, setUserNameMsg] = useState('');
  const [phoneNumberFirstMsg, setPhoneNumberFirstMsg] = useState('');
  const [phoneNumberSecondMsg, setPhoneNumberSecondMsg] = useState('');
  const [phoneNumberThirdMsg, setPhoneNumberThirdMsg] = useState('');
  const [landlinePhoneFirstMsg, setLandlinePhoneFirstMsg] = useState('');
  const [landlinePhoneSecondMsg, setLandlinePhoneSecondMsg] = useState('');
  const [landlinePhoneThirdMsg, setLandlinePhoneThirdMsg] = useState('');

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkShippingAddress, setCheckShippingAddress] = useState(false);
  const [checkShippingAddressDetails, setCheckShippingAddressDetails] =
    useState(false);
  const [checkUserNameEmail, setCheckUserName] = useState(false);
  const [checkPhoneNumberFirst, setCheckPhoneNumberFirst] = useState(false);
  const [checkPhoneNumberSecond, setCheckPhoneNumberSecond] = useState(false);
  const [checkPhoneNumberThird, setCheckPhoneNumberThird] = useState(false);
  const [checkLandlinePhoneFrist, setCheckLandlinePhoneFirst] = useState(false);
  const [checkLandlinePhoneSeocnd, setCheckLandlinePhoneSecond] =
    useState(false);
  const [checkLandlinePhoneThird, setCheckLandlinePhoneThird] = useState(false);

  const isEmailValid = validateEmail(formState.email);
  const isShippingAddressValid = validateShippingAddress(
    formState.shippingAddress
  );
  const isShippingAddressDetailsValid = validateShippingAddressDetails(
    formState.shippingAddressDetails
  );
  const isUserNameValid = validateUserName(formState.userName);
  const isPhoneNumberFirstValid = validatePhoneNumberFirst(
    formState.phoneNumberFirst
  );
  const isPhoneNumberSecondValid = validatePhoneNumberSecond(
    formState.phoneNumberSecond
  );
  const isPhoneNumberThirdValid = validatePhoneNumberThird(
    formState.phoneNumberThird
  );
  const isLandlinePhoneFirstValid = validateLandlinePhoneFirst(
    formState.landlinePhoneFirst
  );
  const isLandlinePhoneSecondValid = validateLandlinePhoneSecond(
    formState.landlinePhoneSecond
  );
  const isLandlinePhoneThirdValid = validateLandlinePhoneThird(
    formState.landlinePhoneThird
  );

  const onChangeEmail = useCallback(async (e) => {
    const currentEmail = e.target.value;

    if (!validateEmail(currentEmail)) {
      setEmailMsg('이메일 형식이 올바르지 않습니다.');
      setCheckEmail(false);
    } else {
      setEmailMsg('올바른 이메일 형식입니다.');
      setCheckEmail(true);
    }
  }, []);

  const onChangeShippingAddress = useCallback(async (e) => {
    const currentShippingAddress = e.target.value;

    if (
      !validateShippingAddress(currentShippingAddress) ||
      currentShippingAddress == ''
    ) {
      setShippingAddressMsg('주소 형식이 올바르지 않습니다.');
      setCheckShippingAddress(false);
    } else {
      setShippingAddressMsg('올바른 주소 형식입니다.');
      setCheckShippingAddress(true);
    }
  }, []);

  const onChangeShippingAddressDetails = useCallback(async (e) => {
    const currentShippingAddressDetails = e.target.value;

    if (
      !validateShippingAddressDetails(currentShippingAddressDetails) ||
      currentShippingAddressDetails == ''
    ) {
      setShippingAddressDetailsMsg('상세주소 형식이 올바르지 않습니다.');
      setCheckShippingAddressDetails(false);
    } else {
      setShippingAddressDetailsMsg('올바른 상세주소 형식입니다.');
      setCheckShippingAddressDetails(true);
    }
  }, []);

  const onChangeUserName = useCallback(async (e) => {
    const currentUserName = e.target.value;

    if (!validateUserName(currentUserName)) {
      setUserNameMsg('이름 형식이 올바르지 않습니다.');
      setCheckUserName(false);
    } else {
      setUserNameMsg('올바른 이름 형식입니다.');
      setCheckUserName(true);
    }
  }, []);

  const onChangePhoneNumberFirst = useCallback(async (e) => {
    const currentPhoneNumberFirst = e.target.value;

    if (!validatePhoneNumberFirst(currentPhoneNumberFirst)) {
      setPhoneNumberFirstMsg('지역번호 형식이 올바르지 않습니다.');
      setCheckPhoneNumberFirst(false);
    } else {
      setPhoneNumberFirstMsg('올바른 지역번호 형식입니다.');
      setCheckPhoneNumberFirst(true);
    }
  }, []);

  const onChangePhoneNumberSecond = useCallback(async (e) => {
    const currentPhoneNumberSecond = e.target.value;

    if (!validatePhoneNumberSecond(currentPhoneNumberSecond)) {
      setPhoneNumberSecondMsg('일반번호 형식이 올바르지 않습니다.');
      setCheckPhoneNumberSecond(false);
    } else {
      setPhoneNumberSecondMsg('올바른 일반번호 형식입니다.');
      setCheckPhoneNumberSecond(true);
    }
  }, []);

  const onChangePhoneNumberThird = useCallback(async (e) => {
    const currentPhoneNumberThird = e.target.value;

    if (!validatePhoneNumberSecond(currentPhoneNumberThird)) {
      setPhoneNumberThirdMsg('일반번호 형식이 올바르지 않습니다.');
      setCheckPhoneNumberThird(false);
    } else {
      setPhoneNumberThirdMsg('올바른 일반번호 형식입니다.');
      setCheckPhoneNumberThird(true);
    }
  }, []);

  const onChangeLandlinePhoneFirst = useCallback(async (e) => {
    const currentLandlinePhoneFirst = e.target.value;

    if (!validateLandlinePhoneFirst(currentLandlinePhoneFirst)) {
      setLandlinePhoneFirstMsg('일반번호 형식이 올바르지 않습니다.');
      setCheckLandlinePhoneFirst(false);
    } else {
      setLandlinePhoneFirstMsg('올바른 일반번호 형식입니다.');
      setCheckLandlinePhoneFirst(true);
    }
  }, []);

  const onChangeLandlinePhoneSecond = useCallback(async (e) => {
    const currentLandlinePhoneSecond = e.target.value;

    if (!validateLandlinePhoneSecond(currentLandlinePhoneSecond)) {
      setLandlinePhoneSecondMsg('일반번호 형식이 올바르지 않습니다.');
      setCheckLandlinePhoneSecond(false);
    } else {
      setLandlinePhoneSecondMsg('올바른 일반번호 형식입니다.');
      setCheckLandlinePhoneSecond(true);
    }
  }, []);

  const onChangeLandlinePhoneThird = useCallback(async (e) => {
    const currentLandlinePhoneThird = e.target.value;

    if (!validateLandlinePhoneThird(currentLandlinePhoneThird)) {
      setLandlinePhoneThirdMsg('일반번호 형식이 올바르지 않습니다.');
      setCheckLandlinePhoneThird(false);
    } else {
      setLandlinePhoneThirdMsg('올바른 일반번호 형식입니다.');
      setCheckLandlinePhoneThird(true);
    }
  }, []);

  const isValidForm =
    formState.email !== '' &&
    formState.userName !== '' &&
    formState.shippingAddress !== '' &&
    formState.shippingAddressDetails &&
    formState.phoneNumberFirst !== '' &&
    formState.phoneNumberSecond !== '' &&
    formState.phoneNumberThird !== '' &&
    formState.landlinePhoneFirst !== '' &&
    formState.landlinePhoneSecond !== '' &&
    formState.landlinePhoneThird !== '';

  if (isLoading) {
    return <Spinner size={160} title="데이터 가져오는 중이에요." />;
  }

  if (error) {
    return (
      <div role="alert">
        <h2>{error.type}</h2>
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <>
      <section className={S.OrderWrapper}>
        <h2 className="sr-only">주문 페이지</h2>
        <form onSubmit={handlePaymentEvent}>
          <div className={`${S.OrderLine}`}></div>
          <span className={S.OrderOrdererInfoTitle}>주문자 정보</span>
          <div className={`${S.OrderOrdererInfoWrapper} mt-10`}>
            <span className="text-[1.25rem]">
              이메일
              <span className="mr-[12.5rem]">*</span>
            </span>
            <div>
              <input
                className={S.LargeInput}
                placeholder="인증 가능한 이메일 주소"
                name="email"
                value={formState.email}
                onChange={(e) => {
                  handleInput(e);
                  onChangeEmail(e);
                }}
              ></input>
              <p
                className={`${S.validationFontStyle} ${
                  isEmailValid ? 'text-infoCorrect' : 'text-infoError'
                }`}
              >
                {emailMsg}
              </p>
            </div>
          </div>
          <div className={S.OrderLine}></div>
          <span className={S.OrderShippingAddress}>배송지 정보</span>
          <span className="text-[1.25rem] flex mr-[48rem] mb-16 mt-10">
            배송지 선택
          </span>
          <div className="flex ml-20 mb-16">
            <div>
              <input
                className={`${S.MiddleInput} ml-[11.5rem]`}
                name="shippingAddress"
                value={formState.shippingAddress}
                onChange={(e) => {
                  handleInput(e);
                  onChangeShippingAddress(e);
                }}
              ></input>
              <p
                className={`${S.validationFontStyle} ${
                  isShippingAddressValid ? 'text-infoCorrect' : 'text-infoError'
                } ml-[185px]`}
              >
                {shippingAddressMsg}
              </p>
            </div>
            <button className="w-[8.125rem] h-[3.125rem] ml-8 bg-black text-white rounded-md">
              주소찾기
            </button>
          </div>
          <div className="flex ml-[16.5rem]" name="shippingAddress">
            <div className="flex justify-between mr-5 mb-16">
              <input
                type="checkbox"
                id="myCheckbox1"
                className="h-4 w-4 mr-2 appearance-none rounded-lg border border-gray-400 bg-gray-300 checked:bg-gray-500"
              ></input>
              <label htmlFor="myCheckbox1">회원 정보와 동일</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="myCheckbox2"
                className="h-4 w-4 mr-2 appearance-none rounded-lg border border-gray-400 bg-gray-300 checked:bg-gray-500"
              ></input>
              <label htmlFor="myCheckbox2">새로운 배송지</label>
            </div>
          </div>
          <div className="flex mr-48 mb-16">
            <span className="text-[1.25rem] flex self-start mr-48 mb-16">
              주소
              <span className="mr-9">*</span>
            </span>
            <div className="flex flex-col">
              <div className="mb-16">
                <input
                  className={`${S.LargeInput}`}
                  placeholder="배송지 주소 입력칸"
                  name="shippingAddress"
                  value={formState.shippingAddress}
                  onChange={(e) => {
                    handleInput(e);
                    onChangeShippingAddress(e);
                  }}
                ></input>
                <p
                  className={`${S.validationFontStyle} ${
                    isShippingAddressValid
                      ? 'text-infoCorrect'
                      : 'text-infoError'
                  }`}
                >
                  {shippingAddressMsg}
                </p>
              </div>
              <div>
                <input
                  className={S.LargeInput}
                  placeholder="배송지 상세 주소 입력칸"
                  name="shippingAddressDetails"
                  value={formState.shippingAddressDetails}
                  onChange={(e) => {
                    handleInput(e);
                    onChangeShippingAddressDetails(e);
                  }}
                ></input>
                <p
                  className={`${S.validationFontStyle} ${
                    isShippingAddressDetailsValid
                      ? 'text-infoCorrect'
                      : 'text-infoError'
                  }`}
                >
                  {shippingAddressDetailsMsg}
                </p>
              </div>
            </div>
          </div>
          <div className="flex mb-16">
            <span className="text-[1.25rem] flex self-start">받으시는 분</span>
            <span className="mr-[11rem]">*</span>
            <div>
              <input
                className={S.LargeInput}
                placeholder="받으시는 분 입력칸"
                name="userName"
                value={formState.userName}
                onChange={(e) => {
                  handleInput(e);
                  onChangeUserName(e);
                }}
              ></input>
              <p
                className={`${S.validationFontStyle} ${
                  isUserNameValid ? 'text-infoCorrect' : 'text-infoError'
                }`}
              >
                {userNameMsg}
              </p>
            </div>
          </div>
          <div className="mr-40 flex mb-16">
            <span className="text-[1.25rem] flex self-start mb-16">
              일반전화
            </span>
            <span className="mr-[12.5rem]">*</span>
            <div>
              <input
                className={S.TinyInput}
                placeholder="일반전화 지역번호 입력칸"
                name="phoneNumberFirst"
                value={formState.phoneNumberFirst}
                onChange={(e) => {
                  handleInput(e);
                  onChangePhoneNumberFirst(e);
                }}
              />
              <p
                className={`${S.validationFontStyle} ${
                  isPhoneNumberFirstValid
                    ? 'text-infoCorrect'
                    : 'text-infoError'
                }`}
              >
                {phoneNumberFirstMsg}
              </p>
            </div>
            <span className="ml-3 mr-3 aria-hidden">-</span>
            <div>
              <input
                className={S.TinyInput}
                placeholder="일반전화 두번째 입력칸"
                name="phoneNumberSecond"
                value={formState.phoneNumberSecond}
                onChange={(e) => {
                  handleInput(e);
                  onChangePhoneNumberSecond(e);
                }}
              />
              <p
                className={`${S.validationFontStyle} ${
                  isPhoneNumberSecondValid
                    ? 'text-infoCorrect'
                    : 'text-infoError'
                }`}
              >
                {phoneNumberSecondMsg}
              </p>
            </div>
            <span className="ml-3 mr-3 aria-hidden">-</span>
            <div>
              <input
                className={S.TinyInput}
                placeholder="일반전화 세번째 입력칸"
                name="phoneNumberThird"
                value={formState.phoneNumberThird}
                onChange={(e) => {
                  handleInput(e);
                  onChangePhoneNumberThird(e);
                }}
              />
              <p
                className={`${S.validationFontStyle} ${
                  isPhoneNumberThirdValid
                    ? 'text-infoCorrect'
                    : 'text-infoError'
                }`}
              >
                {phoneNumberThirdMsg}
              </p>
            </div>
          </div>
          <div className="flex mr-40 mb-16">
            <span className="text-[1.25rem] flex self-start mb-16">
              휴대전화
            </span>
            <span className="mr-[12.5rem]">*</span>
            <div>
              <input
                className={S.TinyInput}
                placeholder="휴대전화 지역번호 입력칸"
                name="landlinePhoneFirst"
                value={formState.landlinePhoneFirst}
                onChange={(e) => {
                  handleInput(e);
                  onChangeLandlinePhoneFirst(e);
                }}
              />
              <p
                className={`${S.validationFontStyle} ${
                  isLandlinePhoneFirstValid
                    ? 'text-infoCorrect'
                    : 'text-infoError'
                }`}
              >
                {landlinePhoneFirstMsg}
              </p>
            </div>
            <span className="ml-3 mr-3 aria-hidden">-</span>
            <div>
              <input
                className={S.TinyInput}
                placeholder="휴대전화 두번째 입력칸"
                name="landlinePhoneSecond"
                value={formState.landlinePhoneSecond}
                onChange={(e) => {
                  handleInput(e);
                  onChangeLandlinePhoneSecond(e);
                }}
              />
              <p
                className={`${S.validationFontStyle} ${
                  isLandlinePhoneSecondValid
                    ? 'text-infoCorrect'
                    : 'text-infoError'
                }`}
              >
                {landlinePhoneSecondMsg}
              </p>
            </div>
            <span className="ml-3 mr-3 aria-hidden">-</span>
            <div>
              <input
                className={S.TinyInput}
                placeholder="휴대전화 세번째 입력칸"
                name="landlinePhoneThird"
                value={formState.landlinePhoneThird}
                onChange={(e) => {
                  handleInput(e);
                  onChangeLandlinePhoneThird(e);
                }}
              />
              <p
                className={`${S.validationFontStyle} ${
                  isLandlinePhoneThirdValid
                    ? 'text-infoCorrect'
                    : 'text-infoError'
                }`}
              >
                {landlinePhoneThirdMsg}
              </p>
            </div>
          </div>
          <div className="flex mr-48 mb-16">
            <span className="text-[1.25rem] flex self-start mb-16 mr-[12rem]">
              배송메시지
            </span>
            <input
              className={S.BigInput}
              placeholder="배송메시지 입력칸"
              name="deliveryMessage"
            />
          </div>
          <div className={S.OrderLine}></div>
          <span className="mr-[50rem] text-[1.5rem] font-bold">결제수단</span>
          <div className="flex mr-52 mt-10 ">
            <span className="text-[1.25rem] flex self-start mb-16 mr-56">
              결제방식
            </span>
            <button
              className={`${isValidForm ? 'text-gray900' : 'text-white'} ${
                isValidForm ? 'bg-yellow' : 'bg-gray750'
              } w-[25rem] h-[3.125rem] bg-yellow rounded-md`}
              title="카카오페이 결제 버튼입니다"
              type="submit"
              disabled={!isValidForm}
            >
              <span className="font-bold">카카오페이로 결제</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default OrderList;
