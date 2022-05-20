/** @jsxImportSource @emotion/react */
// import React from "react";
// import {css} from '@emotion/core';
import { css } from '@emotion/react';

const Header = (props) => {
    return (
        <header
            className="columns is-mobile"
            css={css`
                border-bottom: 0.5px solid silver;
                background: #efefef;
                padding: 10px 10px 0 10px;
            `}
        >
            <div className="column is-1">
                <div>
                    <button className="button is-small is-link" onClick={() => props.setPage(1)}>Back</button>
                </div>
            </div>
            <div className="column"
                css={css
                    `display: flex; 
                align-items: center;
                `}
            >
                <div>
                    <h1 className='title is-1'>Animals</h1>
                </div>


            </div>

            <div className="column has-text-right">
                <form>
                    <input
                        css={css`
                        margin-right: 6px;
                    `}
                        type="text" id="animalsearch" name="animalsearch" />
                    <button className="button is-small is-link">Search</button>
                </form>

                <button
                    css={css`
                margin-top: 6px;
                `}
                    className="button is-small is-link">Add Animal</button>

            </div>
        </header>
    );
};

export default Header;