import React from 'react';

class WindowTabsListingFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filterTerm: ''};

        this.inputFilterHandler = this.inputFilterHandler.bind(this);
    }

    inputFilterHandler(e) {
        this.setState({filterTerm: e.target.value});
        this.props.filterHandler({term: e.target.value});
    }

    render() {
        console.log('rendering WindowsTabsListingFilter');
        let term = this.state.filterTerm;
        return (
            <form>
                <fieldset class="d-flex flex-row">
                    <label for="filter-term" class="mx-2 align-self-center">
                        <i class="fas fa-search"></i>
					</label>
					<input type="text" name="filter-term" class="tab-filter-input flex-fill" placeholder="Search all tabs here" value={term} onChange={this.inputFilterHandler}/>
                </fieldset>
                <fieldset>
                    
                </fieldset>
            </form>
        );
    }
}

export default WindowTabsListingFilter;