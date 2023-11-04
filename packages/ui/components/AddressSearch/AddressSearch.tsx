/* eslint-disable @typescript-eslint/ban-ts-comment */
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import React, { useState } from 'react'
import makeAsyncScriptLoader from 'react-async-script'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

import classNames from 'classnames'
import { Input } from '../Input'
import { Loader as LoaderSpinner } from '../Loader'
import './AddressSearch.css'

export interface Address {
  addressAsString?: string
  streetNumber: string
  streetName: string
  city: string
  postcode: string
  state: string
  country: string
  placeId: string
}

export interface AddressSearchProps {
  apiKey?: string
  address?: Address
  placeholder?: string
  hasError?: boolean
  onSelect: (address?: Address) => void
  onBlur?: () => void
  initialValue?: string
  // https://developers.google.com/places/supported_types#table3
  types?: string[]
  className?: string
  disabled?: boolean
  touchedInvalid?: boolean
}

interface State {
  address?: Address | string
  hasError?: boolean
}

class AddressSearchComponent extends React.Component<AddressSearchProps, State> {
  private searchOptions: {
    bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined
    componentRestrictions?: google.maps.places.ComponentRestrictions | undefined
    location?: google.maps.LatLng | google.maps.LatLngLiteral | undefined
    offset?: number | string | undefined
    radius?: number | string | undefined
    sessionToken?: unknown
    types?: string[] | undefined
  }

  constructor(props: AddressSearchProps) {
    super(props)
    const { types = ['address'] } = props
    this.searchOptions = {
      types,
      componentRestrictions: { country: 'aus' },
    }
    this.state = {
      address: props.address,
      hasError: props.hasError,
    }
  }

  handleChange = (address: string): void => {
    this.setState({
      address,
    })
  }

  handleBlur = (): void => {
    this.props.onBlur && this.props.onBlur()
  }

  handleSelect = async (address: string): Promise<void> => {
    const geocoderResult = await geocodeByAddress(address)
    const addressFields = this.transformToAddressFields(geocoderResult[0])
    const addressAsString = this.transformToAddressString(addressFields)
    this.setState({
      address: addressAsString,
      hasError: false,
    })
    this.props.onSelect({ ...addressFields, addressAsString })
  }

  componentDidMount() {
    this.props.initialValue && this.setState({ address: this.props.initialValue })
  }

  transformToAddressFields({ place_id: placeId, address_components }: google.maps.GeocoderResult): Address {
    const streetNumber = address_components.find((ac) => ac.types[0] === 'street_number')?.long_name ?? ''
    const streetName = address_components.find((ac) => ac.types[0] === 'route')?.long_name ?? ''
    const city = address_components.find((ac) => ac.types[0] === 'locality')?.long_name ?? ''
    const state = address_components.find((ac) => ac.types[0] === 'administrative_area_level_1')?.short_name ?? ''
    const postcode = address_components.find((ac) => ac.types[0] === 'postal_code')?.long_name ?? ''
    const country = address_components.find((ac) => ac.types[0] === 'country')?.long_name ?? ''
    return {
      streetNumber,
      streetName,
      city,
      postcode,
      state,
      country,
      placeId,
    }
  }

  transformToAddressString(address: Address): string {
    return `${address.streetNumber ?? ''} ${address.streetName ? address.streetName + ',' : ''} ${address.city ?? ''} ${
      address.state ? address?.state + ',' : ''
    } ${address.country}`.trim()
  }

  handleCloseClick = (): void => {
    this.setState({
      address: '',
    })
    this.props.onSelect()
  }

  handleError = (status: string, clearSuggestions: () => void): void => {
    console.warn(`Error from Google Maps API ${status}`)
    if (status == 'ZERO_RESULTS' || status == 'REQUEST_DENIED') {
      clearSuggestions()
    } else {
      this.setState({ hasError: true }, () => {
        clearSuggestions()
      })
    }
  }

  render(): JSX.Element {
    const { hasError, address } = this.state
    const addressAsString = typeof address === 'object' ? this.transformToAddressString(address) : address || ''

    return (
      // Places autocomplete needs to upgrade their package to use newer version of React
      <div className={this.props.className}>
        {/*// @ts-ignore */}
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={addressAsString}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={addressAsString.length > 2}
          searchOptions={this.searchOptions}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }): JSX.Element => {
            return (
              <div className="relative h-full">
                <div className={`relative h-full w-full ${hasError ? 'has-hasError' : ''}`}>
                  <Input
                    variant={hasError ? 'is-error' : 'is-primary'}
                    {...getInputProps({
                      placeholder: this.props.placeholder || 'Find your address...',
                      className: classNames(
                        { 'border-red-600': this.props.touchedInvalid },
                        `h-10 hover:border-blue-primary border-2`
                      ),
                      onBlur: this.handleBlur,
                      autoComplete: 'address-search',
                      disabled: this.props.disabled,
                      ref: undefined,
                      errorIconClass: 'transform bg-red-600',
                    })}
                  />

                  {addressAsString.length > 0 && !this.props.disabled && (
                    <button className="absolute top-3 right-12 z-10" onClick={this.handleCloseClick}>
                      <p className="cursor-pointer  text-xs text-gray-400 hover:text-blue-500">
                        clear <FontAwesomeIcon icon={faTimes} className="ml-1" />
                      </p>
                      {/* <FontAwesomeIcon icon={faTimes} className="focus:ring-blue-yourbrand-500 text-xs text-gray-600" /> */}
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="autocomplete-dropdown">
                    {suggestions.map((suggestion, index) => {
                      const className = classnames('suggestion-item', {
                        active: suggestion.active,
                      })

                      return (
                        <div
                          data-testid={`address-search-suggestion-${suggestion.placeId}`}
                          {...getSuggestionItemProps(suggestion, { className })}
                          key={index}
                        >
                          <span>{suggestion.formattedSuggestion.mainText}</span>
                          {', '}
                          <span>{suggestion.formattedSuggestion.secondaryText}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }}
        </PlacesAutocomplete>
      </div>
    )
  }
}

export const AddressSearch = (props: AddressSearchProps): JSX.Element => {
  const [loaded, setLoaded] = useState(false)

  if (!props.apiKey) {
    console.warn('No api key added for GMAPS')
    return <></>
  }

  const Loader = makeAsyncScriptLoader(`https://maps.googleapis.com/maps/api/js?key=${props.apiKey}&libraries=places`)(
    LoaderSpinner
  )

  if (loaded) {
    return <AddressSearchComponent {...props} />
  }
  return (
    //@ts-ignore
    <Loader
      asyncScriptOnLoad={(): void => {
        setLoaded(true)
      }}
    />
  )
}
