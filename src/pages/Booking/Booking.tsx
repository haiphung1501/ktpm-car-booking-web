/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Autocomplete, Button, Input, InputBase } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  DirectionsRenderer,
  Autocomplete as GGAutocomplete,
  GoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getAllUser, registerUser } from '@/apis/user';
import { API_URL, GOOGLE_MAPS_APIKEY } from '@/utils/env';

const Booking = () => {
  const [email, setEmail] = useState<string>();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_APIKEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState<any>(/** @type google.maps.Map */ null);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState(0);

  const { data, refetch } = useQuery({
    queryKey: ['getAllUser'],
    queryFn: () => {
      return getAllUser({ role: 'user' });
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: string) => registerUser({ email: data, password: 'abcd@1234' }),
    onSuccess: () => {
      refetch();
      setEmail('');
      emailjs.sendForm('service_jvzedbg', 'template_0k587q4', '#send-email', 'NskDuMkuDMpEn-pqA');
      notifications.show({
        withCloseButton: true,
        color: 'green',
        title: 'Action success!',
        message: 'Create account success',
      });
    },
    onError: () => {
      notifications.show({
        withCloseButton: true,
        color: 'red',
        title: 'Action fail!',
        message: 'Create account fail. Please try again.',
      });
    },
  });

  const users = data?.users.map((user) => ({ ...user, value: user.email, label: user.email }));

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef<any>();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef<any>();

  async function calculateRoute() {
    if (originRef.current?.value === '' || destiantionRef.current?.value === '') {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results: any = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    let price = +(+results.routes[0].legs[0].distance.value / 1000).toFixed(1) * 20000;

    if (
      originRef.current.value.includes('Quận 5') ||
      originRef.current.value.includes('Quận 1') ||
      originRef.current.value.includes('Quận 3') ||
      destiantionRef.current.value.includes('Quận 5') ||
      destiantionRef.current.value.includes('Quận 1') ||
      destiantionRef.current.value.includes('Quận 3')
    ) {
      price = Math.floor((price + price * 0.1) / 1000) * 1000;
      console.log(price);
    }
    setPrice(price);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setPrice(0);
    originRef.current.value = '';
    destiantionRef.current.value = '';
  }

  const bookingCar = () => {
    const endLocation = directionsResponse.routes[0].legs[0].end_location;
    const startLocation = directionsResponse.routes[0].legs[0].start_location;
    const dataInput = {
      pickupAddress: {
        name: directionsResponse.routes[0].legs[0].start_address,
        fullAddress: directionsResponse.routes[0].legs[0].start_address,
      },
      destinationAddress: {
        name: directionsResponse.routes[0].legs[0].end_address,
        fullAddress: directionsResponse.routes[0].legs[0].end_address,
      },
      distance: directionsResponse.routes[0].legs[0].distance.value,
      price: price,
      duration: directionsResponse.routes[0].legs[0].duration.value,
      pickupLocation: {
        lat: startLocation.lat(),
        lng: startLocation.lng(),
      },
      destination: {
        lat: endLocation.lat(),
        lng: endLocation.lng(),
      },
    };
    console.log(dataInput);
    axios
      .post(`${API_URL}/api/booking/create`, dataInput)
      .then((res) => {
        const bookingInfo = res.data.booking;
        console.log('bookingInfo', bookingInfo);
        clearRoute();
        notifications.show({
          withCloseButton: true,
          color: 'green',
          title: 'Action success!',
          message: 'Booking success',
        });
      })
      .catch((e) => {
        clearRoute();
        console.log(`Booking error ${e}`);
        notifications.show({
          withCloseButton: true,
          color: 'green',
          title: 'Action success!',
          message: 'Booking success',
        });
      });
  };

  if (!isLoaded) return 'Loading...';

  return (
    <div className="p-5">
      <div className="flex items-end gap-4">
        <Autocomplete
          // value={value}
          label="Chọn user"
          placeholder="Chọn user"
          className="w-[300px]"
          // onChange={setValue}
          data={users || []}
        />
        <InputBase
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="ml-10"
          label="Email"
          placeholder="Email"
        />
        <Button disabled={!email} loading={isLoading} onClick={() => mutate(email || '')}>
          Tạo account
        </Button>
        <div className="text-xs text-gray-600">{`(Tạo account nếu user chưa tồn tại)`}</div>
        <form id="send-email" className="hidden">
          <input name="email" value={email} />
          <input name="password" value="1234@abcd" />
        </form>
      </div>
      <div className="mt-4 flex items-end gap-14">
        <div>
          <div className="mb-1">Điểm đón:</div>
          <GGAutocomplete>
            <Input type="text" placeholder="Điểm đón" ref={originRef} />
          </GGAutocomplete>
        </div>
        <div>
          <div className="mb-1">Điểm đến:</div>
          <GGAutocomplete>
            <Input type="text" placeholder="Điểm đến" ref={destiantionRef} />
          </GGAutocomplete>
        </div>
        <Button onClick={calculateRoute}>Submit</Button>
      </div>

      <div className="mt-10 flex gap-10">
        <div style={{ width: 400, height: 400 }}>
          <GoogleMap
            // center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap>
        </div>

        <div>
          <div>Khoảng cách: {distance}</div>
          <div>Thời gian: {duration}</div>
          <div>Giá dự kiến: {price}</div>
          <Button onClick={bookingCar}>Đặt xe</Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
